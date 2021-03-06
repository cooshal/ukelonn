/*
 * Copyright 2020 Steinar Bang
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations
 * under the License.
 */
package no.priv.bang.ukelonn.api.resources;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.MissingResourceException;
import java.util.stream.Collectors;

import javax.ws.rs.WebApplicationException;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import no.priv.bang.osgi.service.mocks.logservice.MockLogService;
import no.priv.bang.ukelonn.UkelonnService;
import no.priv.bang.ukelonn.beans.LocaleBean;

public class LocalizationResourceTest {
    private final static Locale NB_NO = Locale.forLanguageTag("nb-no");

    @Test
    public void testDefaultLocale() {
        UkelonnService ukelonn = mock(UkelonnService.class);
        when(ukelonn.defaultLocale()).thenReturn(NB_NO);
        LocalizationResource resource = new LocalizationResource();
        resource.ukelonn = ukelonn;
        Locale defaultLocale = resource.defaultLocale();
        assertEquals(NB_NO, defaultLocale);
    }

    @Test
    public void testAvailableLocales() {
        UkelonnService ukelonn = mock(UkelonnService.class);
        when(ukelonn.defaultLocale()).thenReturn(NB_NO);
        when(ukelonn.availableLocales()).thenReturn(Arrays.asList(Locale.forLanguageTag("nb-NO"), Locale.UK).stream().map(l -> new LocaleBean(l)).collect(Collectors.toList()));
        LocalizationResource resource = new LocalizationResource();
        resource.ukelonn = ukelonn;
        List<LocaleBean> availableLocales = resource.availableLocales();
        assertThat(availableLocales).isNotEmpty().contains(new LocaleBean(ukelonn.defaultLocale()));
    }

    @Test
    public void testDisplayTextsForDefaultLocale() {
        UkelonnService ukelonn = mock(UkelonnService.class);
        when(ukelonn.defaultLocale()).thenReturn(NB_NO);
        Map<String, String> texts = new HashMap<>();
        texts.put("date", "Dato");
        when(ukelonn.displayTexts(any())).thenReturn(texts);
        LocalizationResource resource = new LocalizationResource();
        resource.ukelonn = ukelonn;
        Map<String, String> displayTexts = resource.displayTexts(ukelonn.defaultLocale().toString());
        assertThat(displayTexts).isNotEmpty();
    }

    @SuppressWarnings("unchecked")
    @Test(expected = WebApplicationException.class)
    public void testDisplayTextsWithUnknownLocale() {
        UkelonnService ukelonn = mock(UkelonnService.class);
        when(ukelonn.displayTexts(any())).thenThrow(MissingResourceException.class);
        LocalizationResource resource = new LocalizationResource();
        MockLogService logservice = new MockLogService();
        resource.logservice = logservice;
        resource.ukelonn = ukelonn;
        Map<String, String> displayTexts = resource.displayTexts("en_UK");
        assertThat(displayTexts).isNotEmpty();
    }

}
